module Api
  module CsrfProtection
    extend ActiveSupport::Concern

    included do
      before_action :check_csrf
    end

    private

      def check_csrf
        return if request.get? || request.head? || request.options?

        check_origin!
        check_fetch_metadata!
      end

      def check_origin!
        origin = request.headers["Origin"]
        return if origin.blank?

        allowed_origins = Settings.front_domain
        return if allowed_origins.include?(origin)

        render_csrf_error
      end

      def check_fetch_metadata!
        sec_fetch_site = request.headers["Sec-Fetch-Site"]
        return if sec_fetch_site.blank?

        allowed = %w[same-origin same-site]
        return if allowed.include?(sec_fetch_site.downcase)

        render_csrf_error
      end

      def render_csrf_error
        Rails.logger.warn(
          "[CSRF_BLOCKED] " \
          "origin=#{request.headers["Origin"]} " \
          "sec_fetch_site=#{request.headers["Sec-Fetch-Site"]} " \
          "path=#{request.fullpath}",
        )

        render_error("CSRF detected", status: :forbidden)
        throw :abort
      end
  end
end
