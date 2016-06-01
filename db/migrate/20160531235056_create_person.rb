class CreatePerson < ActiveRecord::Migration
  create_table(:people) do |t|

    t.string :first_name,              null: false, default: ""
    t.string :last_name,              null: false, default: ""
    t.string :email,              null: false, default: ""
    t.timestamps null: false
  end

  add_index :people, :email,                unique: true
end
