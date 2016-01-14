module PersonalityHelper
  def is_favorite?(personality)
    current_user.personality_ids.include? personality.id
  end
end
