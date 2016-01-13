class PersonalitiesUsers < ActiveRecord::Base
  belongs_to :user
  belongs_to :personality
end
