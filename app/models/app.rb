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

  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
