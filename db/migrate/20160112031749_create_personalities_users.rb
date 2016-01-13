class CreatePersonalitiesUsers < ActiveRecord::Migration
  def change
    create_table :personalities_users do |t|
      t.references :user, index: true, foreign_key: true
      t.references :personality, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
