
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { CreditCard, FileText, Download, Calendar, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

const Earnings = () => {
  const paymentHistory = [
    {
      id: 1,
      date: "Apr 5, 2025",
      description: "College Application Mastery Program - April Payment",
      amount: "$750.00",
      status: "Paid"
    },
    {
      id: 2,
      date: "Mar 5, 2025",
      description: "College Application Mastery Program - March Payment",
      amount: "$750.00",
      status: "Paid"
    },
    {
      id: 3,
      date: "Feb 5, 2025",
      description: "College Application Mastery Program - February Payment",
      amount: "$750.00",
      status: "Paid"
    },
    {
      id: 4,
      date: "Jan 15, 2025",
      description: "SAT Prep Course - One-time Payment",
      amount: "$1,200.00",
      status: "Paid"
    },
    {
      id: 5,
      date: "Jan 5, 2025",
      description: "College Application Mastery Program - January Payment",
      amount: "$750.00",
      status: "Paid"
    }
  ];

  const upcomingPayments = [
    {
      id: 1,
      date: "May 5, 2025",
      description: "College Application Mastery Program - May Payment",
      amount: "$750.00"
    },
    {
      id: 2,
      date: "Jun 5, 2025",
      description: "College Application Mastery Program - June Payment",
      amount: "$750.00"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-r from-college-blue-500/90 to-college-accent-purple/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Payments & Billing
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Manage your payment methods, view transaction history, and update billing information.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="card-shadow h-full">
                  <CardContent className="p-6 h-full flex flex-col">
                    <h2 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                      Payment Methods
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4 flex items-start">
                      <CreditCard className="h-6 w-6 text-college-blue-500 mt-1 mr-3 shrink-0" />
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-800">Visa ending in 4242</h3>
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Default</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Expiry: 05/2026</p>
                        <div className="flex space-x-3 mt-2">
                          <button className="text-sm text-college-blue-500 hover:underline">Edit</button>
                          <button className="text-sm text-gray-500 hover:underline">Remove</button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4 flex items-start">
                      <CreditCard className="h-6 w-6 text-college-blue-500 mt-1 mr-3 shrink-0" />
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-800">Mastercard ending in 8956</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Expiry: 11/2027</p>
                        <div className="flex space-x-3 mt-2">
                          <button className="text-sm text-college-blue-500 hover:underline">Edit</button>
                          <button className="text-sm text-gray-500 hover:underline">Remove</button>
                          <button className="text-sm text-college-blue-500 hover:underline">Make Default</button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto pt-4">
                      <Button variant="outline" className="w-full">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-shadow h-full">
                  <CardContent className="p-6 h-full flex flex-col">
                    <h2 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                      Billing Information
                    </h2>
                    <div className="space-y-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Billing Address</h3>
                        <p className="text-gray-700">
                          Sarah Johnson<br />
                          123 College Avenue<br />
                          Palo Alto, CA 94301<br />
                          United States
                        </p>
                        <button className="text-sm text-college-blue-500 hover:underline mt-2">Edit Address</button>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Billing Email</h3>
                        <p className="text-gray-700">sarah.johnson@example.com</p>
                        <button className="text-sm text-college-blue-500 hover:underline mt-2">Change Email</button>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Billing Phone</h3>
                        <p className="text-gray-700">(555) 123-4567</p>
                        <button className="text-sm text-college-blue-500 hover:underline mt-2">Change Phone</button>
                      </div>
                    </div>
                    <div className="mt-auto pt-4">
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Download Billing Statement
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold font-display text-college-blue-500 mb-6">
                  Upcoming Payments
                </h2>
                {upcomingPayments.length > 0 ? (
                  <Card className="card-shadow">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {upcomingPayments.map(payment => (
                              <tr key={payment.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                    <span className="text-gray-700">{payment.date}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="text-gray-700">{payment.description}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="font-medium text-gray-800">{payment.amount}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <Button size="sm">Pay Now</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="card-shadow">
                    <CardContent className="p-6 text-center">
                      <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-800 mb-2">No Upcoming Payments</h3>
                      <p className="text-gray-600">
                        You don't have any scheduled payments due at this time.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold font-display text-college-blue-500">
                    Payment History
                  </h2>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                <Card className="card-shadow">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {paymentHistory.map(payment => (
                            <tr key={payment.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-gray-700">{payment.date}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-gray-700">{payment.description}</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="font-medium text-gray-800">{payment.amount}</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {payment.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-college-blue-500 hover:text-college-blue-700 flex items-center">
                                  <Download className="h-4 w-4 mr-1" />
                                  <span>PDF</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-college-blue-50 p-8 md:p-12 rounded-xl">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4">
                      Need Help With Billing?
                    </h3>
                    <p className="text-gray-700 mb-5">
                      Our team is here to assist you with any questions about your payments, plans, or billing information.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Clock className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span><strong>Billing Hours:</strong> Monday - Friday, 9AM - 5PM Pacific Time</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span><strong>Email:</strong> billing@zoffnesscollegeprep.com</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span><strong>Phone:</strong> (650) 555-1235</span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h4 className="text-xl font-bold text-college-blue-500 mb-4 text-center">
                        Payment Plans
                      </h4>
                      <p className="text-gray-700 mb-4 text-center">
                        Need flexible payment options? We offer installment plans for our programs.
                      </p>
                      <Button className="w-full bg-college-blue-500 hover:bg-college-blue-600 mb-3">
                        Explore Payment Plans
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
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

export default Earnings;
