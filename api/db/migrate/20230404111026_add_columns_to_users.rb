class AddColumnsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :admin, :boolean, default: false
    add_column :users, :admin_id, :string, null: false, default: '000000',  limit:6
  end
end
