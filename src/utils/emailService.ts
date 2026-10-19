export interface EmailPayload {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  service?: string;
  website?: string;
  growthGoal?: string;
  planName?: string;
  amount?: string;
  paymentMethod?: string;
  utrNumber?: string;
  formType: 'contact' | 'strategy' | 'payment';
}

export interface EmailResponse {
  success: boolean;
  message?: string;
  id?: string;
  simulated?: boolean;
}

export const sendEmail = async (payload: EmailPayload): Promise<EmailResponse> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || data.success === false) {
      return {
        success: false,
        message: data.error || data.message || 'Failed to send message. Please try again later.',
      };
    }

    return {
      success: true,
      id: data.id || (data.data && data.data.id),
      simulated: data.preview ?? data.simulated,
      message: data.message || 'Your message has been sent successfully!',
    };
  } catch (error: any) {
    console.error('Network or sending error:', error);
    return {
      success: false,
      message: 'Network error occurred while sending your request. Please try again.',
    };
  }
};
