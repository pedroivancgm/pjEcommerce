class CreateProducts < ActiveRecord::Migration[8.1]
  def change
    create_table :products do |t|
      t.string :name
      t.decimal :price
      t.string :category
      t.text :description

      t.timestamps
    end
  end
end
