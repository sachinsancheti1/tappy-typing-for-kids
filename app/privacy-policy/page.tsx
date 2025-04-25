import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Typing for Kids",
  description: "Privacy policy for the Typing for Kids interactive typing book website",
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-orange-50">
      <div className="max-w-4xl mx-auto p-6 py-12">
        <Link href="/" className="text-orange-500 hover:underline mb-8 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-orange-500 mb-8">Privacy Policy</h1>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Typing for Kids ("we," "our," or "us"). We are committed to protecting your privacy and personal
            information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
            you visit our website typing-for-kids.netlify.app, including any other media form, media channel, mobile
            website, or mobile application related or connected thereto (collectively, the &quot;Site&quot;).
          </p>
          <p className="mb-4">
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please
            do not access the site.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">2. Information We Collect</h2>

          <h3 className="text-xl font-bold text-orange-500 mt-6 mb-3">Personal Data</h3>
          <p className="mb-4">
            When you visit our Site, we may collect personal information that you voluntarily provide to us, such as
            your name and email address when you contact us or sign up for our newsletter.
          </p>

          <h3 className="text-xl font-bold text-orange-500 mt-6 mb-3">Usage Data</h3>
          <p className="mb-4">
            We automatically collect certain information when you visit, use, or navigate the Site. This information
            does not reveal your specific identity but may include device and usage information, such as your IP
            address, browser and device characteristics, operating system, language preferences, referring URLs, device
            name, country, location, information about how and when you use our Site, and other technical information.
          </p>

          <h3 className="text-xl font-bold text-orange-500 mt-6 mb-3">Cookies and Similar Technologies</h3>
          <p className="mb-4">
            We use cookies and similar tracking technologies to track the activity on our Site and hold certain
            information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect in various ways, including to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>
              Communicate with you, either directly or through one of our partners, for customer service, updates, and
              other website-related information
            </li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">4. Analytics</h2>
          <p className="mb-4">We use third-party Service Providers to monitor and analyze the use of our Service.</p>
          <h3 className="text-xl font-bold text-orange-500 mt-6 mb-3">Google Analytics</h3>
          <p className="mb-4">
            Google Analytics is a web analytics service offered by Google that tracks and reports website traffic.
            Google uses the data collected to track and monitor the use of our Service. This data is shared with other
            Google services. Google may use the collected data to contextualize and personalize the ads of its own
            advertising network.
          </p>
          <h3 className="text-xl font-bold text-orange-500 mt-6 mb-3">Microsoft Clarity</h3>
          <p className="mb-4">
            Microsoft Clarity is a user behavior analytics tool that helps us understand how users interact with our
            website. It uses session replay technology to recreate a user's journey on our website and provides heatmaps
            to visualize where users click, scroll, and spend time.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">5. Children's Privacy</h2>
          <p className="mb-4">
            Our Service is intended for use by children, but only with parental supervision. We do not knowingly collect
            personally identifiable information from children under 13 without parental consent. If you are a parent or
            guardian and you are aware that your child has provided us with personal data, please contact us. If we
            become aware that we have collected personal data from children without verification of parental consent, we
            take steps to remove that information from our servers.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">6. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">7. Contact Us</h2>
          <p className="mb-4">If you have any questions about this Privacy Policy, please contact us on the website form.</p>
        </div>
      </div>
    </main>
  )
}
