import { FolderOpen, Sparkles } from "lucide-react";
import { Button, Icon, Overlay } from "@/components/primitives";
import writeUrl from "@/assets/mascot/write.png";

type WelcomeOverlayProps = {
  open: boolean;
  onClose: () => void;
  onOpenFolder: () => void;
};

export function WelcomeOverlay({ open, onClose, onOpenFolder }: WelcomeOverlayProps) {
  return (
    <Overlay open={open} onClose={onClose} ariaLabel="welcome to marka.md" variant="modal">
      <div className="mdv-welcome">
        <img
          src={writeUrl}
          alt=""
          aria-hidden
          width={140}
          height={140}
          draggable={false}
          className="mdv-welcome__art"
        />
        <h1 className="mdv-welcome__title">marka.md</h1>
        <p className="mdv-welcome__tagline">
          a local markdown space — built for the notes you share with ai.
        </p>
        <ul className="mdv-welcome__points">
          <li>open a folder of <code>.md</code> files. browse it in the sidebar.</li>
          <li>edit on the left, see the live preview on the right.</li>
          <li>five themes, optional macOS vibrancy, full keyboard control.</li>
          <li>press <kbd className="mdv-kbd">⌘</kbd> <kbd className="mdv-kbd">K</kbd> any time for the command palette.</li>
        </ul>
        <div className="mdv-welcome__actions">
          <Button
            variant="solid"
            onClick={() => {
              onClose();
              void onOpenFolder();
            }}
            icon={<Icon icon={FolderOpen} size={14} strokeWidth={1.75} />}
          >
            open a folder
          </Button>
          <Button
            onClick={onClose}
            icon={<Icon icon={Sparkles} size={14} strokeWidth={1.75} />}
          >
            explore the demo
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
