# frozen_string_literal: true

# == Schema Information
#
# Table name: apps
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  type       :string           default("None")
#  region     :string           default("")
#  server     :string           default("")
#  favorite   :boolean          default(FALSE)
#  owner_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class App < ApplicationRecord
  self.inheritance_column = :_type_disabled

  has_many :user_apps
  has_many :users, through: :user_apps
  belongs_to :owner, class_name: "User", foreign_key: "owner_id"

  VALID_NAME_REGEX = /\A([a-z0-9]+[-]*[a-z0-9]+[-]*[a-z0-9]+)\z/i

  validates :name, presence: true, format: VALID_NAME_REGEX, uniqueness: { case_sensitive: false },
                   length: { minimum: 3, maximum: 50 }

  before_save :downcase_fields

  scope :ordered, -> { order(name: :desc) }

  def downcase_fields
    name.downcase!
  end
end
