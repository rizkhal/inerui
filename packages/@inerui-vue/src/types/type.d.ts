export {};

export type TAlert = {
  label: string;
  message: string;
  variant: "success" | "info" | "warning" | "danger";
};

export interface InputEvent extends Event {
  target: HTMLInputElement;
}
