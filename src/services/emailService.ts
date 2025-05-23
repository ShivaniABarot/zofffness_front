import axios from 'axios';

const API_BASE_URL = 'https://zoffness.academy/api';

/**
 * Email service for sending registration confirmation emails using Gmail SMTP
 */
export const emailService = {
  /**
   * Send registration confirmation email
   * @param emailData - Email data including recipient and registration details
   */
  sendRegistrationConfirmation: async (emailData: {
    parent_email: string;
    student_email?: string;
    parent_name: string;
    student_name: string;
    course_type: string;
    package_name?: string;
    amount?: number;
    payment_intent_id?: string;
  }) => {
    try {
      console.log('Sending registration confirmation email via Gmail SMTP:', emailData);

      // Prepare email data for backend with Gmail SMTP configuration
      const emailPayload = {
        to_email: emailData.parent_email,
        cc_email: emailData.student_email || '',
        parent_name: emailData.parent_name,
        student_name: emailData.student_name,
        course_type: emailData.course_type,
        package_name: emailData.package_name || '',
        amount: emailData.amount || 0,
        payment_intent_id: emailData.payment_intent_id || '',
        email_type: 'registration_confirmation',
        // Email template data
        subject: `Registration Confirmation - ${emailData.course_type}`,
        from_name: 'Zoffness Academy',
        from_email: 'shivanidbarot@gmail.com'
      };

      // Try to send email via backend API with Gmail SMTP
      const response = await axios.post(`${API_BASE_URL}/send-registration-email`, emailPayload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.data.success) {
        console.log('Registration confirmation email sent successfully');
        return {
          success: true,
          message: 'Registration confirmation email sent successfully'
        };
      } else {
        throw new Error(response.data.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending registration confirmation email:', error);

      // Fallback: Try alternative email endpoint with Gmail SMTP
      try {
        console.log('Trying alternative email endpoint with Gmail SMTP...');
        const fallbackPayload = {
          type: 'registration_confirmation',
          to: emailData.parent_email,
          cc: emailData.student_email || '',
          subject: `Registration Confirmation - ${emailData.course_type}`,
          from_name: 'Zoffness Academy',
          from_email: 'shivanidbarot@gmail.com',
          template_data: {
            parent_name: emailData.parent_name,
            student_name: emailData.student_name,
            course_type: emailData.course_type,
            package_name: emailData.package_name,
            amount: emailData.amount,
            payment_intent_id: emailData.payment_intent_id
          }
        };

        const fallbackResponse = await axios.post(`${API_BASE_URL}/send-email`, fallbackPayload, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (fallbackResponse.data.success) {
          console.log('Email sent via fallback endpoint with Gmail SMTP');
          return {
            success: true,
            message: 'Registration confirmation email sent successfully'
          };
        }
      } catch (fallbackError) {
        console.error('Fallback email endpoint also failed:', fallbackError);
      }

      // If both endpoints fail, return error but don't throw
      // This ensures form submission still succeeds even if email fails
      return {
        success: false,
        message: 'Registration completed successfully, but confirmation email could not be sent. You will receive a confirmation email shortly.',
        error: error
      };
    }
  },

  /**
   * Send payment confirmation email
   * @param emailData - Payment confirmation email data
   */
  sendPaymentConfirmation: async (emailData: {
    parent_email: string;
    student_email?: string;
    parent_name: string;
    student_name: string;
    course_type: string;
    amount: number;
    payment_intent_id: string;
    package_name?: string;
  }) => {
    try {
      console.log('Sending payment confirmation email via Gmail SMTP:', emailData);

      // Prepare payment confirmation email data
      const paymentEmailPayload = {
        to_email: emailData.parent_email,
        cc_email: emailData.student_email || '',
        parent_name: emailData.parent_name,
        student_name: emailData.student_name,
        course_type: emailData.course_type,
        package_name: emailData.package_name || '',
        amount: emailData.amount,
        payment_intent_id: emailData.payment_intent_id,
        email_type: 'payment_confirmation',
        // Email template data
        subject: `Payment Confirmation - ${emailData.course_type}`,
        from_name: 'Zoffness Academy',
        from_email: 'shivanidbarot@gmail.com'
      };

      const response = await axios.post(`${API_BASE_URL}/send-payment-confirmation`, paymentEmailPayload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.data.success) {
        console.log('Payment confirmation email sent successfully');
        return {
          success: true,
          message: 'Payment confirmation email sent successfully'
        };
      } else {
        throw new Error(response.data.message || 'Failed to send payment confirmation email');
      }
    } catch (error) {
      console.error('Error sending payment confirmation email:', error);

      return {
        success: false,
        message: 'Payment processed successfully, but confirmation email could not be sent.',
        error: error
      };
    }
  }
};
