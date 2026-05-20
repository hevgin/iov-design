import { ElementUIComponent } from './component'

/** Avatar Component */
export declare class ElAvatar extends ElementUIComponent {
  icon: string;

  size: string | number;

  shape: string;

  src: string;

  error: () => false;

  srcSet: string;

  alt: string;

  fit: string;

  backgroundColor: string;

  color: string;

  fontSize: string | number;
}

/** AvatarGroup Component */
export declare class ElAvatarGroup extends ElementUIComponent {
  size: string | number;

  max: number;

  overlap: number;

  shape: string;

  hoverExpand: boolean;
}
