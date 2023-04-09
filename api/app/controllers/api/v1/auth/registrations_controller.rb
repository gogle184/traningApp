class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController

  private 
    def sign_up_params
      params.permit(:email, :password, :password_confimation, :name, :admin_id)
    end
end
