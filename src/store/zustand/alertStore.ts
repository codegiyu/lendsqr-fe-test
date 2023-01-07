import create from "zustand";
import { persist } from "zustand/middleware";

interface AlertObj {
    message: string | null;
    type: string | null;
}

interface AlertState {
    alertExists: boolean | null;
    alert: AlertObj;
    setAlert: (obj: AlertObj) => void;
    clearAlert: () => void;
}

const useAlertStore = create<AlertState>()(
    persist((set) => ({
        alertExists: false,
        alert: { message: "", type: ""},
        setAlert: (obj: AlertObj) => set(() => (
            { alertExists: true, alert: obj }
        )),
        clearAlert: () => set(() => (
            { alertExists: false, alert: { message: "", type: null } }
        ))
    }),
    {
        name: "alert-storage",
        getStorage: () => sessionStorage
    }
))

export default useAlertStore