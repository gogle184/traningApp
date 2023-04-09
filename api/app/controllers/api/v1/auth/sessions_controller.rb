class Api::V1::Auth::SessionsController < ApplicationController

  def index
    if current_api_v1_user
      render json: { 
        status: 200, 
        current_user: { 
          email: current_api_v1_user.email, 
          name: current_api_v1_user.name, 
          adminId: current_api_v1_user.adminId 
        }
      }
    else
      render json: {status: 500, message: "ユーザーが存在しません。"}
    end
  end
end
