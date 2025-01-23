import { DataTypes, Sequelize } from "sequelize";

export const UserModel = (sequelize: Sequelize) => {
  return sequelize.define<any>(
    "user",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
        },
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(100),
        defaultValue: "user",
        allowNull: false,
        validate: {
          isIn: {
            args: [["user", "admin"]],
            msg: "Role type must be either 'user' or 'admin'",
          },
        },
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
