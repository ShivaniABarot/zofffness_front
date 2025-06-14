import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { User, Mail, Phone, Lock, Bell, Shield, Save } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-r from-college-blue-500/90 to-college-accent-purple/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Account Settings
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Manage your profile, preferences, and account information.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                  <Card className="card-shadow sticky top-24">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center mb-6">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                          <User className="h-12 w-12 text-gray-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">
                          Sarah Johnson
                        </h2>
                        <p className="text-gray-600">Student</p>
                      </div>
                      <nav>
                        <ul className="space-y-2">
                          <li>
                            <a
                              href="#profile"
                              className="flex items-center p-2 rounded-md bg-college-blue-50 text-college-blue-600 font-medium"
                            >
                              <User className="h-5 w-5 mr-3" />

                              <span>Profile Information</span>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#security"
                              className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <Lock className="h-5 w-5 mr-3" />

                              <span>Security</span>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#notifications"
                              className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <Bell className="h-5 w-5 mr-3" />

                              <span>Notifications</span>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#privacy"
                              className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <Shield className="h-5 w-5 mr-3" />

                              <span>Privacy</span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </CardContent>
                  </Card>
                </div>

                <div className="w-full md:w-2/3">
                  <div id="profile" className="mb-12">
                    <h2 className="text-2xl font-bold font-display text-college-blue-500 mb-6">
                      Profile Information
                    </h2>
                    <Card className="card-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label
                                htmlFor="firstName"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                First Name
                              </label>
                              <input
                                type="text"
                                id="firstName"
                                defaultValue="Sarah"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-college-blue-500"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="lastName"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Last Name
                              </label>
                              <input
                                type="text"
                                id="lastName"
                                defaultValue="Johnson"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-college-blue-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Email Address
                            </label>
                            <div className="flex">
                              <div className="relative flex-grow">
                                <input
                                  type="email"
                                  id="email"
                                  defaultValue="sarah.johnson@example.com"
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-college-blue-500 pl-10"
                                />

                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Phone Number
                            </label>
                            <div className="flex">
                              <div className="relative flex-grow">
                                <input
                                  type="tel"
                                  id="phone"
                                  defaultValue="(555) 123-4567"
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-college-blue-500 pl-10"
                                />

                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="school"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Current School
                            </label>
                            <input
                              type="text"
                              id="school"
                              defaultValue="Palo Alto High School"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-college-blue-500"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="gradYear"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Graduation Year
                            </label>
                            <select
                              id="gradYear"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-college-blue-500"
                            >
                              <option value="2025">2025</option>
                              <option value="2026">2026</option>
                              <option value="2027">2027</option>
                              <option value="2028">2028</option>
                              <option value="2029">2029</option>
                            </select>
                          </div>

                          <div className="pt-2">
                            <Button className="bg-college-blue-500 hover:bg-college-blue-600">
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div id="security" className="mb-12">
                    <h2 className="text-2xl font-bold font-display text-college-blue-500 mb-6">
                      Security
                    </h2>
                    <Card className="card-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div>
                            <label
                              htmlFor="currentPassword"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Current Password
                            </label>
                            <input
                              type="password"
                              id="currentPassword"
                              placeholder="Enter your current password"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-college-blue-500"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label
                                htmlFor="newPassword"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                New Password
                              </label>
                              <input
                                type="password"
                                id="newPassword"
                                placeholder="Enter new password"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-college-blue-500"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm new password"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-college-blue-500"
                              />
                            </div>
                          </div>

                          <div className="pt-2">
                            <Button className="bg-college-blue-500 hover:bg-college-blue-600">
                              Update Password
                            </Button>
                          </div>

                          <div className="border-t border-gray-200 pt-6 mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                              Two-Factor Authentication
                            </h3>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-700">
                                  Add an extra layer of security to your account
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  We'll send a verification code to your phone
                                  each time you sign in.
                                </p>
                              </div>
                              <div className="flex items-center">
                                <span className="text-red-500 mr-3">
                                  Not Enabled
                                </span>
                                <Button variant="outline">Enable</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div id="notifications" className="mb-12">
                    <h2 className="text-2xl font-bold font-display text-college-blue-500 mb-6">
                      Notifications
                    </h2>
                    <Card className="card-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                            <div>
                              <h3 className="font-medium text-gray-800">
                                Email Notifications
                              </h3>
                              <p className="text-sm text-gray-500">
                                Receive updates about your account and services
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked
                                className="sr-only peer"
                              />

                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-college-blue-500"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                            <div>
                              <h3 className="font-medium text-gray-800">
                                SMS Notifications
                              </h3>
                              <p className="text-sm text-gray-500">
                                Receive text messages for important updates
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />

                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-college-blue-500"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                            <div>
                              <h3 className="font-medium text-gray-800">
                                Marketing Communications
                              </h3>
                              <p className="text-sm text-gray-500">
                                Receive information about new services and
                                promotions
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked
                                className="sr-only peer"
                              />

                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-college-blue-500"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-gray-800">
                                Session Reminders
                              </h3>
                              <p className="text-sm text-gray-500">
                                Receive reminders before scheduled sessions
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked
                                className="sr-only peer"
                              />

                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-college-blue-500"></div>
                            </label>
                          </div>

                          <div className="pt-2">
                            <Button className="bg-college-blue-500 hover:bg-college-blue-600">
                              Save Preferences
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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

export default Settings;
