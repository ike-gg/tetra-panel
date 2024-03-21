import { create } from "zustand";
import { type FittingOptions } from "~/types";

export type CroppingDetails = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export interface AdjustmentOptionsStateProperties {
  lossy?: number;
  colors?: number;
  scale?: number;
  frameRate?: number;
  cut?: [number, number];
  crop?: CroppingDetails;
  fitting: FittingOptions;
}

interface AdjustmentOptionsStateMethods {
  setLossy: (value: number) => void;
  setColors: (value: number) => void;
  setCrop: (value: CroppingDetails) => void;
  setScale: (value: number) => void;
  setCut: (value: [number, number]) => void;
  setFrameRate: (value: number) => void;
  setFitting: (value: FittingOptions) => void;
  removeLossy: () => void;
  removeColors: () => void;
  removeCrop: () => void;
  removeScale: () => void;
  removeCut: () => void;
  removeFrameRate: () => void;
  removeFitting: () => void;
  reset: () => void;
}

const initialState: AdjustmentOptionsStateProperties = {
  fitting: "contain",
  colors: undefined,
  crop: undefined,
  cut: undefined,
  frameRate: undefined,
  lossy: undefined,
  scale: undefined,
};

interface AdjustmentState
  extends AdjustmentOptionsStateMethods,
    AdjustmentOptionsStateProperties {}

export const useAdjustmentStore = create<AdjustmentState>()((set) => ({
  fitting: "contain",

  setLossy: (value) => set((state) => ({ ...state, lossy: value })),
  setColors: (value) => set((state) => ({ ...state, colors: value })),
  setCrop: (value) => set((state) => ({ ...state, crop: value })),
  setScale: (value) => set((state) => ({ ...state, scale: value })),
  setCut: (value) => set((state) => ({ ...state, cut: value })),
  setFrameRate: (value) => set((state) => ({ ...state, frameRate: value })),
  setFitting: (value) => set((state) => ({ ...state, fitting: value })),

  removeLossy: () => set((state) => ({ ...state, lossy: undefined })),
  removeColors: () => set((state) => ({ ...state, colors: undefined })),
  removeCrop: () => set((state) => ({ ...state, crop: undefined })),
  removeScale: () => set((state) => ({ ...state, scale: undefined })),
  removeCut: () => set((state) => ({ ...state, cut: undefined })),
  removeFrameRate: () => set((state) => ({ ...state, frameRate: undefined })),
  removeFitting: () => set((state) => ({ ...state, fitting: undefined })),
  reset: () => set(() => initialState),
}));
