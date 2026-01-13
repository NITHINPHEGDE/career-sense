from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.optimizers import Adam


def build_ann(input_dim: int):
    """
    Builds and returns a compiled ANN model.

    Parameters
    ----------
    input_dim : int
        Number of input features

    Returns
    -------
    model : keras.Model
        Compiled Keras model
    """

    model = Sequential(
        [
            Dense(64, activation="relu", input_shape=(input_dim,)),
            Dense(32, activation="relu"),
            Dense(1)  # Regression output (Salary)
        ]
    )

    model.compile(
        optimizer=Adam(learning_rate=0.001),
        loss="mse",
        metrics=["mae"]
    )

    return model
