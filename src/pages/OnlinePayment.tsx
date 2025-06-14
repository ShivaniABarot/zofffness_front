import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { CreditCard, Lock, Info, CheckCircle2, ArrowRight } from "lucide-react";

const OnlinePayment = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-accent-purple/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Online Payment
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Make secure payments for your college preparation programs and
                services.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <div className="lg:col-span-2">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                      Payment Form
                    </h2>
                    <p className="text-gray-700">
                      Please provide your payment information below. All
                      transactions are secure and encrypted.
                    </p>
                  </div>

                  <form className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                      <h3 className="text-xl font-bold text-college-blue-500 mb-4">
                        Student Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="studentFirstName"
                            className="text-sm font-medium text-gray-700"
                          >
                            Student First Name
                          </label>
                          <Input
                            id="studentFirstName"
                            placeholder="Enter student's first name"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="studentLastName"
                            className="text-sm font-medium text-gray-700"
                          >
                            Student Last Name
                          </label>
                          <Input
                            id="studentLastName"
                            placeholder="Enter student's last name"
                            required
                          />
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-700"
                        >
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                      <h3 className="text-xl font-bold text-college-blue-500 mb-4">
                        Payment Details
                      </h3>

                      <div className="space-y-2 mb-4">
                        <label
                          htmlFor="paymentType"
                          className="text-sm font-medium text-gray-700"
                        >
                          Payment Type
                        </label>
                        <select
                          id="paymentType"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-college-blue-500"
                        >
                          <option value="">Select payment type</option>
                          <option value="program">Program Payment</option>
                          <option value="tutoring">Tutoring Hours</option>
                          <option value="test">Test Registration</option>
                          <option value="deposit">Program Deposit</option>
                          <option value="other">Other Payment</option>
                        </select>
                      </div>

                      <div className="space-y-2 mb-4">
                        <label
                          htmlFor="amount"
                          className="text-sm font-medium text-gray-700"
                        >
                          Payment Amount ($)
                        </label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter payment amount"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="paymentNotes"
                          className="text-sm font-medium text-gray-700"
                        >
                          Payment Notes (Optional)
                        </label>
                        <Textarea
                          id="paymentNotes"
                          placeholder="Add any specific details about this payment"
                          rows={2}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-college-blue-500 mb-4 flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Credit Card Information
                      </h3>

                      <div className="space-y-2 mb-4">
                        <label
                          htmlFor="cardName"
                          className="text-sm font-medium text-gray-700"
                        >
                          Cardholder Name
                        </label>
                        <Input
                          id="cardName"
                          placeholder="Name as it appears on card"
                          required
                        />
                      </div>

                      <div className="space-y-2 mb-4">
                        <label
                          htmlFor="cardNumber"
                          className="text-sm font-medium text-gray-700"
                        >
                          Card Number
                        </label>
                        <Input
                          id="cardNumber"
                          placeholder="XXXX XXXX XXXX XXXX"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="expiration"
                            className="text-sm font-medium text-gray-700"
                          >
                            Expiration Date
                          </label>
                          <Input id="expiration" placeholder="MM/YY" required />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="cvv"
                            className="text-sm font-medium text-gray-700"
                          >
                            CVV
                          </label>
                          <div className="relative">
                            <Input id="cvv" placeholder="XXX" required />

                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-help">
                              <Info className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <label
                          htmlFor="billingAddress"
                          className="text-sm font-medium text-gray-700"
                        >
                          Billing Address
                        </label>
                        <Input
                          id="billingAddress"
                          placeholder="Street address"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="city"
                            className="text-sm font-medium text-gray-700"
                          >
                            City
                          </label>
                          <Input id="city" required />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="state"
                            className="text-sm font-medium text-gray-700"
                          >
                            State
                          </label>
                          <Input id="state" required />
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        <label
                          htmlFor="zipCode"
                          className="text-sm font-medium text-gray-700"
                        >
                          Zip Code
                        </label>
                        <Input id="zipCode" required />
                      </div>
                    </div>

                    <div className="flex items-start">
                      <input
                        id="termsAgreed"
                        type="checkbox"
                        className="h-4 w-4 mt-1 mr-2"
                        required
                      />

                      <label
                        htmlFor="termsAgreed"
                        className="text-sm text-gray-700"
                      >
                        I agree to the terms and conditions and authorize
                        Zoffness College Prep to charge my credit card for the
                        amount specified above.
                      </label>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-college-blue-500 hover:bg-college-blue-600"
                      >
                        Submit Payment
                        <Lock className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </form>
                </div>

                <div className="lg:col-span-1 space-y-6">
                  <Card className="card-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                        Secure Payments
                      </h3>
                      <div className="flex items-center mb-4">
                        <Lock className="text-college-blue-500 mr-2 h-5 w-5" />

                        <p className="font-medium text-gray-900">
                          Your information is encrypted and secure
                        </p>
                      </div>
                      <p className="text-gray-700 mb-4">
                        We use industry-standard encryption and security
                        protocols to protect your personal and payment
                        information.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <div className="bg-gray-200 rounded-md p-2 h-8 w-12"></div>
                        <div className="bg-gray-200 rounded-md p-2 h-8 w-12"></div>
                        <div className="bg-gray-200 rounded-md p-2 h-8 w-12"></div>
                        <div className="bg-gray-200 rounded-md p-2 h-8 w-12"></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                        Payment Options
                      </h3>
                      <ul className="space-y-3 mb-4">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                          <span className="text-gray-700">
                            Credit card payments
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                          <span className="text-gray-700">
                            Payment plans available
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                          <span className="text-gray-700">
                            Program deposits
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                          <span className="text-gray-700">
                            Full or partial payments
                          </span>
                        </li>
                      </ul>
                      <p className="text-sm text-gray-700">
                        For questions about alternative payment methods, please
                        contact our billing department.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                        Need Help?
                      </h3>
                      <p className="text-gray-700 mb-4">
                        If you have any questions about payments or need
                        assistance, our billing team is here to help.
                      </p>
                      <p className="text-gray-700 mb-2">
                        <strong>Email:</strong> info@zoffnesscollageprep.com
                      </p>
                      <p className="text-gray-700 mb-2">
                        <strong>Phone:</strong> (650) 555-1235
                      </p>
                      <Button
                        variant="outline"
                        className="w-full border-college-blue-500 text-college-blue-500 hover:bg-college-blue-50"
                      >
                        Contact Billing
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OnlinePayment;
