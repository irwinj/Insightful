class UsersController < ApplicationController

	def show
		@user = User.find params[:id]
    @comments = Comment.all.where(user_id: params[:id]).joins(:user).joins(:personality)
    p '----------------------------'
    p @comments

    p '----------------------------'
	end

end
