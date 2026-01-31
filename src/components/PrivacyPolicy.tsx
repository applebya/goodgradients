import { ChevronLeft } from "./icons";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <a
          href="/"
          className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Good Gradients
        </a>

        <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Overview</h2>
            <p>
              Good Gradients is a free, open-source CSS gradient generator. We
              respect your privacy and are committed to transparency about our
              data practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Data We Collect
            </h2>
            <p className="mb-3">
              <strong className="text-neutral-200">Analytics:</strong> We use{" "}
              <a
                href="https://posthog.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                PostHog
              </a>{" "}
              to collect anonymous usage analytics. This includes:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Pages visited</li>
              <li>
                Features used (e.g., copying gradients, applying animations)
              </li>
              <li>General browser and device information</li>
              <li>Approximate geographic region</li>
            </ul>
            <p className="mt-3">
              This data is anonymous and cannot be used to identify you
              personally.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Local Storage
            </h2>
            <p>
              Your favorites are stored locally in your browser using
              localStorage. This data never leaves your device and is not sent
              to any server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              No Account Required
            </h2>
            <p>
              Good Gradients does not require an account. We do not collect
              email addresses, passwords, or any other personal information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Third-Party Services
            </h2>
            <p>This site is hosted on GitHub Pages. We use:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>
                <strong className="text-neutral-200">GitHub Pages</strong> for
                hosting
              </li>
              <li>
                <strong className="text-neutral-200">PostHog</strong> for
                anonymous analytics
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Accessibility Disclaimer
            </h2>
            <p className="mb-3">
              Good Gradients provides WCAG contrast ratio estimates as a
              convenience feature. These calculations are based on the average
              color of gradient backgrounds and are provided for informational
              purposes only.
            </p>
            <p className="mb-3">
              <strong className="text-neutral-200">Important:</strong> Due to
              the nature of gradients (color variations, angles, color stops),
              actual contrast ratios will vary across different areas of the
              gradient. The values displayed are approximations and should not
              be relied upon for accessibility compliance.
            </p>
            <p>
              We make no warranties or guarantees regarding the accuracy of
              accessibility calculations. You are solely responsible for
              verifying that your designs meet applicable accessibility
              standards. Good Gradients and its contributors shall not be held
              liable for any claims arising from the use of these estimates.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Open Source
            </h2>
            <p>
              Good Gradients is open source. You can review the entire codebase
              on{" "}
              <a
                href="https://github.com/applebya/goodgradients"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                GitHub
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
            <p>
              Questions about this policy? Open an issue on{" "}
              <a
                href="https://github.com/applebya/goodgradients/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                GitHub
              </a>
              .
            </p>
          </section>

          <section className="pt-4 border-t border-neutral-800">
            <p className="text-neutral-500 text-xs">
              Last updated: January 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
