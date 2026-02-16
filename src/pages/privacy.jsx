import React from 'react'
import Navbar from "../components/Navbar";
import Head from 'next/head';
function Privacy() {
    return (
        <div>

            <Navbar />
<div className="bg-gray-100 min-h-screen py-12 mt-[20px]">
          <Head>
            <title>Privacy Policy - Muhira Ltd.</title>
            <meta name="description" content="Privacy Policy for Gurex Ltd." />
          </Head>
    
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">Privacy Policy</h1>
    
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-6">
                This Privacy Policy outlines how Muhira Ltd. (&apos;we&apos;, &apos;our&apos;, or &apos;us&apos;) collects, uses, maintains, and discloses information collected from users (&apos;you&apos; or &apos;your&apos;) of the Muhira Ltd. website (the &apos;Site&apos;) and any related services, including but not limited to our ecommerce store and email newsletter.
              </p>
    
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-6">
                We may collect personal identification information from you in a variety of ways, including, but not limited to, when you visit our Site, register on the Site, place an order, subscribe to our newsletter, respond to a survey, fill out a form, or interact with other activities, services, features, or resources we make available on our Site. You may be asked for, as appropriate, your name, email address, mailing address, phone number, credit card information, and other personal details. We will collect personal identification information from you only if you voluntarily submit such information to us.
              </p>
    
              {/* Other sections of the privacy policy go here */}
    
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. How We Use Collected Information

</h2>
              <p className="text-gray-700">
              We may use the information we collect from you for various purposes, including:

To process transactions: We may use the information you provide when placing an order to process and fulfill your order. We do not share this information with outside parties except to the extent necessary to provide the service.
To send periodic emails: We may use the email address you provide to send you information and updates pertaining to your order, respond to your inquiries, and/or other requests or questions. If you decide to opt-in to our mailing list, you will receive emails that may include company news, updates, related product or service information, etc. If at any time you would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email.              </p>
           
           
<h2 className="text-xl font-semibold text-gray-800 mb-4">3. How We Protect Your Information


</h2>
              <p className="text-gray-700">
              We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Site.  </p>
   

              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Sharing Your Personal Information




</h2>
              <p className="text-gray-700">
              We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.</p>   
           
           

              <p className="text-gray-700">
              5. Changes to This Privacy Policy   </p>

              <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Muhira Ltd. has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage you to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.


              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Your Acceptance of These Terms</h2>
          <p className="text-gray-700">
            By using this Site, you signify your acceptance of this policy. If you do not agree...
          </p>




</h2>
            </div>
          </div>
        </div>
        </div>
        
      );
    
}

export default Privacy