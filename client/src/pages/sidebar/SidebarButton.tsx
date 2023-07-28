import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Props {
  view: boolean;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
  openIcon: IconDefinition;
  closeIcon: IconDefinition;
  name: string;
  className: string;
}

export default function SidebarButton({
  view,
  setView,
  openIcon,
  closeIcon,
  name,
  className,
}: Props) {
  return (
    <div
      className={`sidebarButton ${name} ${className}`}
      onClick={() => setView((current: boolean) => !current)}
    >
      <FontAwesomeIcon icon={view ? closeIcon : openIcon} size="lg" />
    </div>
  );
}
