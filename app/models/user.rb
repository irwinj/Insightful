class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

    validates :username,
	  presence: true,
	  length: { in: 3..20}

	  has_and_belongs_to_many :personalities
end
