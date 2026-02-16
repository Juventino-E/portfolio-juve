import { defineAction, ActionError } from "astro:actions";
import { z } from "zod";
import { Resend } from "resend";
import { render } from "@react-email/render";
import ContactEmail from "../emails/contactEmail";
import { translations } from "../i18n";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Función para obtener mensajes de error según idioma
const getValidationMessages = (lang: "es" | "en") => {
  const messages = {
    es: {
      nameRequired: "El nombre es requerido min 2 caracteres",
      emailInvalid: "Correo inválido",
    },
    en: {
      nameRequired: "Name is required min 2 characters",
      emailInvalid: "Invalid email",
    },
  };
  return messages[lang];
};

export const server = {
  send: defineAction({
    accept: "form",
    input: z
      .object({
        userFirstname: z.string(),
        email: z.string(),
        lang: z.enum(["es", "en"]).default("es"),
      })
      .superRefine((data, ctx) => {
        const messages = getValidationMessages(data.lang);
        
        if (!data.userFirstname || data.userFirstname.length < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["userFirstname"],
            message: messages.nameRequired,
          });
        }
        
        if (!data.email || !z.string().email().safeParse(data.email).success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["email"],
            message: messages.emailInvalid,
          });
        }
      }),
   handler: async ({ userFirstname, email, lang }) => {
  try {
    const emailTexts = translations[lang].email;
    
    // ✅ Estos logs básicos SÍ funcionan
    console.log("RESEND_FROM:", import.meta.env.RESEND_FROM);
    console.log("PORTFOLIO_BCC:", import.meta.env.PORTFOLIO_BCC);
    console.log("Target email:", email);
    console.log("API Key present:", !!import.meta.env.RESEND_API_KEY);
    
    const emailContent = ContactEmail({
      userFirstname,
      texts: emailTexts,
      lang,
    });

    const html = await render(emailContent);
    const text = await render(emailContent, { plainText: true });

    console.log("📧 Sending email:", {
      from: import.meta.env.RESEND_FROM,
      to: email,
      subject: emailTexts.subject,
      hasHtml: !!html,
      hasText: !!text,
    });

    const { data, error } = await resend.emails.send({
      from: import.meta.env.RESEND_FROM,
      to: [email],
      bcc: import.meta.env.PORTFOLIO_BCC
        ? [import.meta.env.PORTFOLIO_BCC]
        : undefined,
      subject: emailTexts.subject,
      html,
      text,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      throw new ActionError({
        code: "BAD_REQUEST",
        message: error.message,
      });
    }

    // ✅ Log seguro - solo el ID, no todo el objeto data
    console.log("✅ Email sent successfully. ID:", data?.id);
    return data;
    
  } catch (err: any) {
    console.error("❌ Handler error:", err?.message || err);
    throw new ActionError({
      code: "BAD_REQUEST",
      message: err?.message || "Error al enviar el correo",
    });
  }
},
  }),
};