
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-earnify-blue font-heading font-semibold text-lg">Earnify</h3>
            <p className="text-gray-500 text-sm">Earn Daily by Doing Easy Tasks</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-earnify-blue text-sm">
              Privacy Policy
            </Link>
            <Link to="/" className="text-gray-600 hover:text-earnify-blue text-sm">
              Terms of Service
            </Link>
            <Link to="/" className="text-gray-600 hover:text-earnify-blue text-sm">
              About Us
            </Link>
            <Link to="/" className="text-gray-600 hover:text-earnify-blue text-sm">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} Earnify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
