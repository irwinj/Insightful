class CreatePersonalities < ActiveRecord::Migration
  def change
    create_table :personalities do |t|
      t.text :input
      t.text :data
      t.string :title

      t.timestamps null: false
    end
  end
end
