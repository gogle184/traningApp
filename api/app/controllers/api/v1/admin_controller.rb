class Api::V1::AdminController < ApplicationController
  before_action :authenticate_api_v1_user!

  def create_user
    if current_api_v1_user.admin?
      user = User.new(user_params)
      if user.save
        render json: { status: 200, message: "ユーザーの作成に成功しました" }
      else
        render json: { status: 500, message: "ユーザーの作成に失敗しました。" }
      end
    else
      render json: { status: 401, message: "管理者権限がありません。" }
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :name, :admin_id)
  end
end
