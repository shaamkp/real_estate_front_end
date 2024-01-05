import { create } from "zustand";

export const useBearStore = create((set) => ({
  userData: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {
        userData: {
          username: "",
          isVerified: false,
          accessToken: "",
        },
      },
  updateUserData: (username, isVerified, accessToken) =>
    set((state) => {
      const userData = {
        username: username,
        isVerified: isVerified,
        accessToken: accessToken,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      return {
        userData: userData,
      };
    }),
  removeAllBears: () => set({ bears: 0 }),
}));
