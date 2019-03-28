class Api::PostsController < ApplicationController
    before_action :set_cat
    before_action :set_post, only: [:show, :update, :destroy]
  
    def index
      render json: @cat.posts
    end
  
    def show
      render json: @post
    end
  
    def create
      post = @cat.posts.new(post_params)
      if post.save
        render json: post
      else
        render json: post.errors
      end
    end
  
    def update
      if @post.update(post_params)
        render json: @post
      else
        render json: @post.errors
      end
    end
  
    def destroy
      @post.destroy
    end
  
    private
      def set_cat
        @cat = Cat.find(params[:cat_id])
      end
  
      def set_post
        @post = @cat.posts.find(params[:id])
      end
  
      def post_params
        params.require(:post).permit(:name)
      end
  end
