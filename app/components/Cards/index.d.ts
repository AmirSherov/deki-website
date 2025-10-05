import { ForwardRefExoticComponent, RefAttributes, HTMLAttributes, ReactNode } from 'react';

export const Card: ForwardRefExoticComponent<
  HTMLAttributes<HTMLDivElement> & { customClass?: string } & RefAttributes<HTMLDivElement>
>;

export interface CardSwapProps {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick: (index: number) => void;
  skewAmount?: number;
  easing?: string;
  children: ReactNode;
}

declare const CardSwap: React.FC<CardSwapProps>;
export default CardSwap;
