import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Calendar,
  BookOpen,
  Clock,
  CheckCircle2,
  TrendingUp,
  FileText,
  Bell,
  Settings,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold font-display text-college-blue-500 mb-2">
                  Welcome back, Sarah
                </h1>
                <p className="text-gray-600">
                  Here's an overview of your college preparation progress.
                </p>
              </div>
              <div className="flex mt-4 md:mt-0 space-x-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-college-blue-500 text-college-blue-500 hover:bg-college-blue-50"
                >
                  <Bell className="h-4 w-4" />
                  Notifications
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-college-blue-500 text-college-blue-500 hover:bg-college-blue-50"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-500 mb-1">Upcoming Sessions</p>
                      <h3 className="text-2xl font-bold text-gray-900">3</h3>
                    </div>
                    <div className="bg-college-blue-100 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-college-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-500 mb-1">Completed Tasks</p>
                      <h3 className="text-2xl font-bold text-gray-900">72%</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-500 mb-1">SAT Practice Score</p>
                      <h3 className="text-2xl font-bold text-gray-900">1380</h3>
                    </div>
                    <div className="bg-college-accent-purple/20 p-3 rounded-full">
                      <TrendingUp className="h-6 w-6 text-college-accent-purple" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <Card className="bg-white shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                      Upcoming Schedule
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 mr-4">
                          <div className="bg-college-accent-purple/20 p-3 rounded-full">
                            <BookOpen className="h-5 w-5 text-college-accent-purple" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold text-gray-900">
                            College Essay Review Session
                          </h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1 flex-wrap gap-y-1">
                            <div className="flex items-center mr-4">
                              <Calendar className="h-4 w-4 mr-1" />

                              <span>Thursday, April 10, 2025</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />

                              <span>4:00 PM - 5:30 PM</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-college-blue-500 hover:bg-college-blue-600 ml-2 flex-shrink-0"
                        >
                          Join
                        </Button>
                      </div>

                      <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 mr-4">
                          <div className="bg-college-accent-purple/20 p-3 rounded-full">
                            <BookOpen className="h-5 w-5 text-college-accent-purple" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold text-gray-900">
                            SAT Math Practice Session
                          </h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1 flex-wrap gap-y-1">
                            <div className="flex items-center mr-4">
                              <Calendar className="h-4 w-4 mr-1" />

                              <span>Saturday, April 12, 2025</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />

                              <span>10:00 AM - 12:00 PM</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-college-blue-500 hover:bg-college-blue-600 ml-2 flex-shrink-0"
                        >
                          Join
                        </Button>
                      </div>

                      <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 mr-4">
                          <div className="bg-college-accent-purple/20 p-3 rounded-full">
                            <BookOpen className="h-5 w-5 text-college-accent-purple" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold text-gray-900">
                            College List Strategy Session
                          </h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1 flex-wrap gap-y-1">
                            <div className="flex items-center mr-4">
                              <Calendar className="h-4 w-4 mr-1" />

                              <span>Tuesday, April 15, 2025</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />

                              <span>5:00 PM - 6:00 PM</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-college-blue-500 hover:bg-college-blue-600 ml-2 flex-shrink-0"
                        >
                          Join
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <Button
                        variant="outline"
                        className="text-college-blue-500 border-college-blue-500 hover:bg-college-blue-50"
                      >
                        View Full Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-white shadow-sm h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                      Upcoming Tasks
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">
                            Finish personal statement draft
                          </p>
                          <p className="text-sm text-gray-500">
                            Due: April 12, 2025
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">
                            Complete SAT practice test #3
                          </p>
                          <p className="text-sm text-gray-500">
                            Due: April 14, 2025
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">
                            Research UC application requirements
                          </p>
                          <p className="text-sm text-gray-500">
                            Due: April 16, 2025
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">
                            Update activities list
                          </p>
                          <p className="text-sm text-gray-500">
                            Due: April 18, 2025
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">
                            Schedule college visit to Stanford
                          </p>
                          <p className="text-sm text-gray-500">
                            Due: April 20, 2025
                          </p>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-6 text-center">
                      <Button
                        variant="outline"
                        className="text-college-blue-500 border-college-blue-500 hover:bg-college-blue-50"
                      >
                        View All Tasks
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    Your Progress
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          College List
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          80%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-college-blue-500 h-2 rounded-full"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Essays
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          65%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-college-blue-500 h-2 rounded-full"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Test Prep
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          75%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-college-blue-500 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Activities List
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          90%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-college-blue-500 h-2 rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Financial Aid Planning
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          50%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-college-blue-500 h-2 rounded-full"
                          style={{ width: "50%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    Recent Documents
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <FileText className="h-5 w-5 text-college-blue-500 mr-3" />

                        <div>
                          <p className="font-medium text-gray-900">
                            Personal_Statement_Draft2.docx
                          </p>
                          <p className="text-sm text-gray-500">
                            Edited 2 days ago
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <FileText className="h-5 w-5 text-college-blue-500 mr-3" />

                        <div>
                          <p className="font-medium text-gray-900">
                            College_List_April.xlsx
                          </p>
                          <p className="text-sm text-gray-500">
                            Edited 3 days ago
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <FileText className="h-5 w-5 text-college-blue-500 mr-3" />

                        <div>
                          <p className="font-medium text-gray-900">
                            SAT_Practice_Test2_Results.pdf
                          </p>
                          <p className="text-sm text-gray-500">
                            Edited 5 days ago
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <FileText className="h-5 w-5 text-college-blue-500 mr-3" />

                        <div>
                          <p className="font-medium text-gray-900">
                            Activity_List_Updated.docx
                          </p>
                          <p className="text-sm text-gray-500">
                            Edited 1 week ago
                          </p>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <div className="mt-4 text-center">
                    <Button
                      variant="outline"
                      className="text-college-blue-500 border-college-blue-500 hover:bg-college-blue-50"
                    >
                      View All Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
