#[cfg(target_os = "macos")]
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial, NSVisualEffectState};

// `Manager` powers `_app.get_webview_window` in the macOS setup block,
// `Emitter` powers the file-open event below, and `RunEvent::Opened` is a
// macOS-only enum variant (Finder "Open With" file association). Gating the
// whole `use` line lets the crate compile on Windows + Linux where the
// variant doesn't exist.
#[cfg(target_os = "macos")]
use tauri::{Emitter, Manager, RunEvent};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app = tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .setup(|_app| {
            #[cfg(target_os = "macos")]
            {
                let window = _app.get_webview_window("main").expect("main window missing");
                if let Err(err) = apply_vibrancy(
                    &window,
                    NSVisualEffectMaterial::Sidebar,
                    Some(NSVisualEffectState::Active),
                    Some(12.0),
                ) {
                    eprintln!("marka.md: apply_vibrancy failed: {err:?}");
                }
            }
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while building tauri application");

    app.run(|_app_handle, _event| {
        // macOS Finder "Open With → marka.md" emits this event with file URLs.
        // `RunEvent::Opened` doesn't exist on Windows/Linux — gating the block
        // keeps non-mac compilation clean.
        #[cfg(target_os = "macos")]
        if let RunEvent::Opened { urls } = _event {
            for url in urls {
                if let Ok(path) = url.to_file_path() {
                    let path_str = path.to_string_lossy().to_string();
                    if let Err(err) = _app_handle.emit("marka:open-file", path_str.clone()) {
                        eprintln!("marka.md: failed to emit open-file event: {err:?}");
                    } else {
                        eprintln!("marka.md: open-file requested: {path_str}");
                    }
                }
            }
        }
    });
}
