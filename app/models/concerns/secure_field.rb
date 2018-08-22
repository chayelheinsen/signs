# frozen_string_literal: true

module SecureField
  extend ActiveSupport::Concern

  class_methods do
    def has_secure_fields(*fields) # rubocop:disable PredicateName
      fields.each do |field|
        attr_encrypted field, key: ENV["SECURE_FIELD_KEY"]
      end
    end
  end
end
