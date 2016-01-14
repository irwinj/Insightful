class CommentsController < ApplicationController
  before_filter :authenticate_user!

  def new
  end

  def create
    comment = Comment.new body: comment_params[:body], user: current_user
    comment.personality = Personality.find(params[:personality_id])

    if comment.save
      redirect_to :back, notice: 'Comment created!'
    else
      redirect_to :back, alert: 'There was a problem!'
    end
  end
  
  def update
    comment = Comment.find params[:id]
    comment.update comment_params
    # redirect_to comments_path
  end

  def edit
     @comment = Comment.find params[:id]
  end

  def destroy
    Comment.find(params[:id]).delete
    # redirect_to comments_path
  end

  def index
  end

  def show
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :personality_id)
  end
end
