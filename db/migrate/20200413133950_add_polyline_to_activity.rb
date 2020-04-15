class AddPolylineToActivity < ActiveRecord::Migration[6.0]
  def change
    add_column :activities, :polyline, :string
  end
end
