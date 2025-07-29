"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Play, Users, Calendar, ChevronDown } from "lucide-react"
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ConvocLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, []);


  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header
        className={`border-b border-gray-800/50 fixed w-full z-50 transition-all duration-500 ${isScrolled ? "bg-black/95 backdrop-blur-md shadow-2xl" : "bg-black/90 backdrop-blur-sm"
          }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <Image src="/convoc.png" alt="C" width={40} height={40} />

            <span className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent transition-all duration-300 group-hover:from-purple-300 group-hover:to-white">
              CONVOC
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#"
              className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group"
            >
              Why Convoc?
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div className="relative group">
              <button className="text-gray-300 hover:text-white flex items-center transition-all duration-300 hover:scale-105">
                Product{" "}
                <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
            </div>
            <div className="relative group">
              <button className="text-gray-300 hover:text-white flex items-center transition-all duration-300 hover:scale-105">
                Solutions{" "}
                <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
            </div>
            <div className="relative group">
              <button className="text-gray-300 hover:text-white flex items-center transition-all duration-300 hover:scale-105">
                Resources{" "}
                <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
            </div>
            <Link
              href="#"
              className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-400 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:text-white bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 hover:border-purple-400"
              onClick={() => router.push("/auth/register")}
            >
              Sign up
            </Button>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
              onClick={() => window.location.href = "/auth/login"}
            >
              Sign in
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-black via-gray-900/80 to-purple-900/30 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Unlock Boundless Connections
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-300 via-white to-purple-300 bg-clip-text text-transparent">
              with Convoc
            </span>{" "}
            <span className="inline-flex items-center animate-bounce">📹</span>{" "}
            <span className="bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent">
              Video Call
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up delay-200 leading-relaxed">
            Convoc Video Calls make it easy to connect with people, no matter how far apart you are. Whether it&apos;s
            chatting with friends, working with colleagues, or sharing special moments with family.
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 animate-fade-in-up delay-300">
            Get started for free
          </Button>
        </div>

        {/* Video Call Interface Mockup */}
        <div className="container mx-auto px-4 mt-16 animate-fade-in-up delay-500">
          <div className="relative max-w-6xl mx-auto group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:scale-105"></div>
            <Image
              src="/original-f4cf824f32282dbc032583eb184881c3.webp"
              alt="Convoc Video Call Interface"
              width={1000}
              height={400}
              className="w-full rounded-2xl shadow-2xl relative z-10 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-purple-500/20"
            />
          </div>
        </div>
      </section>

      {/* Professionals Section */}
      <section className="py-20 bg-gradient-to-b from-purple-900/30 via-gray-900/50 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Professionals of all types get
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-300 via-white to-purple-300 bg-clip-text text-transparent">
              more done with Convoc
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 animate-fade-in-up delay-200">
            Get any kind of work or client meeting booked, fast.
          </p>


          {/* Feature Cards */}
          <div className="grid gap-12 md:gap-16 md:grid-cols-2 items-center max-w-7xl mx-auto px-4">
            {/* Section 1 */}
            <div className="text-left animate-fade-in-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Meet with candidates faster,
                <br />
                stay in your own workflow
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                Looking for the fastest way to meet with candidates? Convoc does just that.
              </p>
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 bg-transparent transition-all duration-300 hover:scale-105 hover:border-gray-500 hover:shadow-lg"
              >
                See how
              </Button>
            </div>

            <div className="relative animate-fade-in-right group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:scale-105"></div>
              <Image
                src="/image.png"
                alt="Meeting with candidates interface"
                width={500}
                height={300}
                className="rounded-2xl shadow-xl mx-auto relative z-10 transition-all duration-500 group-hover:scale-[1.02] w-64 sm:w-80 md:w-[450px]"
              />
            </div>

            {/* Section 2 */}
            <div className="relative md:order-first animate-fade-in-left group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:scale-105"></div>
              <Image
                src="/image2.png"
                alt="Video call scheduling interface"
                width={500}
                height={300}
                className="rounded-2xl shadow-xl mx-auto relative z-10 transition-all duration-500 group-hover:scale-[1.02] w-64 sm:w-80 md:w-[450px]"
              />
            </div>

            <div className="text-left animate-fade-in-right">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Send candidates your 1:1 or
                <br />
                Booking Page
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                Propose several times or let them book directly on your schedule.
              </p>
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 bg-transparent transition-all duration-300 hover:scale-105 hover:border-gray-500 hover:shadow-lg"
              >
                See how
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Productivity Section */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/30 to-purple-900/40 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Be more productive in work, life and
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-300 via-white to-purple-300 bg-clip-text text-transparent">
              productivity for meeting notes.
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-16 max-w-4xl mx-auto animate-fade-in-up delay-200 leading-relaxed">
            Our meeting notes tool is your key to being more productive, whether at work or in your personal life. It
            helps you stay organized and efficient, ensuring you never forget important details, tasks, or deadlines.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto px-4">
            {/* Card 1 */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 hover:border-gray-600/50 animate-fade-in-left group">
              <CardContent className="text-left">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Easy to create meetings and
                  <br />
                  invite people
                </h3>
                <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  Our platform makes it a breeze to set up meetings and invite participants.
                </p>
                <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/50 rounded-lg p-3 sm:p-4 border border-gray-700/30 transition-all duration-300 group-hover:border-gray-600/50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-xs sm:text-sm text-gray-400 font-mono break-all">
                      https://convoc.app/meeting/q5t1r2z
                    </span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 w-full sm:w-auto"
                    >
                      Join meet
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 hover:border-gray-600/50 animate-fade-in-right group">
              <CardContent className="text-left">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Collaboration with AI Meeting
                  <br />
                  Notes, made easy
                </h3>
                <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  No more taking detailed notes during meetings — our AI system does it for you.
                </p>
                <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/50 rounded-lg p-3 sm:p-4 border border-gray-700/30 transition-all duration-300 group-hover:border-gray-600/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">Summary</span>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-gray-700/50 transition-all duration-300 hover:scale-110"
                      >
                        🔄
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-gray-700/50 transition-all duration-300 hover:scale-110"
                      >
                        ⛶
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">
                    <p className="font-semibold mb-1">Resume</p>
                    <p className="leading-relaxed">
                      The kickoff meeting for the Arebook Redesign Landing Page project aimed to outline the key objectives and
                      strategies for revamping the existing landing page. The primary focus is on enhancing user experience,
                      improving visual aesthetics, and optimizing the landing page for…
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>


          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-purple-900/40 to-blue-900/30 border-purple-500/30 p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up delay-300 group">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                  <Users className="w-8 h-8" />
                </div>
                <h4 className="font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Grouping & Personal to make your privacy safe
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Our system offers both grouping and personalization features to ensure your privacy is safeguarded.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/30 border-blue-500/30 p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in-up delay-400 group">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-blue-500/50">
                  <Calendar className="w-8 h-8" />
                </div>
                <h4 className="font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Invite your team/people to join meetings
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Our platform simplifies the process of inviting your team or other participants to your meetings.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/40 to-purple-900/30 border-green-500/30 p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 animate-fade-in-up delay-500 group">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-green-500/50">
                  <Play className="w-8 h-8" />
                </div>
                <h4 className="font-bold mb-2 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                  Record your meeting easily and repeat that!
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Our tool makes it easy to record your meetings and play them back whenever you need to.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-purple-900/40 via-purple-800/60 to-purple-700/50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              What people are saying about
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent">
              Convoc apps and how to feel it
            </span>
          </h2>
          <p className="text-xl text-gray-200 mb-16 max-w-4xl mx-auto animate-fade-in-up delay-200 leading-relaxed">
            Find out what people have to say about Convoc Apps and experience it for yourself. See how it&apos;s making a
            positive impact on users and take it for a spin to feel the difference.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                text: "Convoc Apps is the best video conferencing app I've used. It's easy to use, has great quality video calls with helpful features. I feel secure using it, and it's made my virtual meetings a lot better. I highly recommend it!",
                author: "Maria Genova A.",
                role: "Co-Founder Blythe App",
              },
              {
                text: "Convoc Apps has been a game-changer for my virtual meetings. It's super easy to use, and I love the features like screen sharing and chat, which make my meetings more effective. Plus, I feel safe using it. I'm a happy Convoc Apps user!",
                author: "Lucy Bond",
                role: "Freelancer Designer Game",
              },
              {
                text: "Convoc Apps has made my life so much easier. It's user-friendly, and the video and audio quality are fantastic. I can't imagine my virtual meetings without it. Convoc Apps is a real winner!",
                author: "Kan Rasmussen",
                role: "Manager Booty App",
              },
              {
                text: "Convoc Apps is a total game-changer for virtual meetings. It's a breeze to use, and the video and audio are top-notch and I highly recommend Convoc Apps to anyone in need of a reliable video conferencing solution.",
                author: "Richard Van Dowski",
                role: "Lead Business WrongMap",
              },
              {
                text: "I can't say enough good things about Convoc Apps. It's made my virtual meetings a joy. It's so easy to use, the video and audio quality are superb",
                author: "Alice Whiten",
                role: "Freelance UI/UX",
              },
              {
                text: "Convoc Apps is simply amazing. It's a breeze to use, and the video and audio quality are top-notch. The collaborative features, like screen sharing and chat, make my meetings more productive.",
                author: "Loy Brison",
                role: "Graphic Design J&G Design",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-600/30 p-6 text-left transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 hover:border-gray-500/50 animate-fade-in-up group`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent>
                  <p className="text-gray-200 mb-4 text-sm leading-relaxed">{testimonial.text}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600/50 to-blue-600/50 rounded-full mr-3 transition-all duration-300 group-hover:scale-110 overflow-hidden">
                      <Image
                        alt="Random person"
                        // The src is now deterministic based on server-chosen ID
                        src={`https://randomuser.me/api/portraits/men/${index}.jpg`}
                        height={40}
                        width={40}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-sm text-white">{testimonial.author}</p>
                      <p className="text-xs text-gray-300">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-purple-700/50 via-purple-800/70 to-purple-900/80 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              Run delightful
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent">
              meetings with Convoc
            </span>
          </h2>
          <p className="text-xl text-gray-200 mb-12 animate-fade-in-up delay-200 leading-relaxed">
            Enjoy great meetings with Convoc and try the software app with easier
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 border border-purple-200/50">
              Request a demo
            </Button>
            <Button
              variant="outline"
              className="border-gray-400/50 text-white hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 px-8 py-3 text-lg bg-transparent transition-all duration-300 hover:scale-105 hover:border-gray-300/50 hover:shadow-lg"
            >
              Try for free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-fade-in-up">
              <div className="flex items-center space-x-2 mb-4 group cursor-pointer">
                <Image src="/convoc.png" alt="C" width={35} height={35} />
                <span className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  CONVOC
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type.
              </p>
            </div>

            <div className="animate-fade-in-up delay-100">
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Home", "About us", "Frequently Asked Questions", "Pricing"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-fade-in-up delay-200">
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["1:1 Meetings", "AI Meeting Notes", "Booking Page"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-fade-in-up delay-300">
              <h4 className="font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Help Center", "Feedback", "Sales"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              {[
                { icon: FaFacebook, color: "hover:text-blue-400" },
                { icon: FaInstagram, color: "hover:text-pink-400" },
                { icon: FaLinkedin, color: "hover:text-blue-500" },
                { icon: FaTwitter, color: "hover:text-blue-300" },
              ].map(({ icon: Icon, color }, index) => (
                <Link
                  key={index}
                  href="#"
                  className={`text-gray-400 ${color} transition-all duration-300 hover:scale-125 hover:rotate-12`}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>

            <p className="text-gray-400 text-sm">© 2025 Convoc, All Rights Reserved</p>

            <div className="flex space-x-4 text-sm text-gray-400 mt-4 md:mt-0">
              {["Privacy Policy", "Legal Notice", "Terms of Use"].map((item) => (
                <Link key={item} href="#" className="hover:text-white transition-all duration-300 hover:underline">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
