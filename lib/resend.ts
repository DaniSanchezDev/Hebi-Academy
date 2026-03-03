import { Resend } from 'resend';

// Inicializar el cliente de Resend con la API key
export const resend = new Resend(process.env.RESEND_API_KEY);
