import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database/database';

class Historial extends Model {
  public id!: number;
  public name!: string;
  public information!: object;
  public created_date!: Date;
}

Historial.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    information: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    created_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'historial',
    timestamps: false,
  }
);

export default Historial;