/**
 * The `Layout` component is a higher-order component that wraps the `children` components and displays
 * a toast notification based on the context provided by the `useAppContext` hook.
 * @returns The Layout component is being returned.
 */
import RegisterModal from "../RegisterModal";
import { toast, ToastContainer } from "react-toastify";
import { useAppContext } from "../../Context";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const context = useAppContext();
  useEffect(() => {
    if (context.showNotification) {
      toast.info(context.customMessage, {
        autoClose: 3000,
        position: "bottom-right",
        style: {
          bottom: "5rem",
        },
        hideProgressBar: false,
        onClose: () => {
          context.setShowNotification(false);
          context.setCustomMessage("");
        },
      });
    }
  }, [context]);

  return (
    <main>
      <section className='fixed-background'></section>
      {children}
      <ToastContainer />
      <RegisterModal />
    </main>
  );
};

export default Layout;
