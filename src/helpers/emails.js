import emailjs from "@emailjs/browser";

// .env에서 바로 불러오기
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

// 최초에 한 번 초기화
emailjs.init(publicKey);

export const useEmails = () => {
  /**
   * @param {string} fromName
   * @param {string} fromEmail
   * @param {string} customSubject
   * @param {string }message
   * @return {Promise<boolean>|Boolean}
   */
  const sendContactEmail = async (
    fromName,
    fromEmail,
    customSubject,
    message
  ) => {
    if (!isInitialized()) return;

    const params = {
      from_name: fromName,
      from_email: fromEmail,
      custom_subject: customSubject,
      message: message,
    };

    try {
      await emailjs.send(serviceId, templateId, params);
      return true;
    } catch (error) {
      console.error("Email send failed:", error);
      return false;
    }
  };

  return {
    sendContactEmail,
  };
};
