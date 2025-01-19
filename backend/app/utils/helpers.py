from app.schemas.response import Statistics, TrendChangesHistogram
from typing import List
import statistics


def generate_trend_changes_histogram(values: List[float]) -> TrendChangesHistogram:
    # Placeholder logic for generating histogram
    # Define bins based on labels: [-1, -0.5, -0.2, 0.2, 0.5, 1]
    bins = [-1, -0.5, -0.2, 0.2, 0.5, 1]
    counts = [0] * (len(bins) - 1)
    for i in range(1, len(bins)):
        lower = bins[i - 1]
        upper = bins[i]
        count = sum(lower < value <= upper for value in values)
        counts[i - 1] = count

    histogram = TrendChangesHistogram(values=counts, labels=bins)
    return histogram


def calculate_statistics(values: List[float]) -> Statistics:
    if not values:
        raise ValueError("No values provided for statistics calculation.")

    median_val = statistics.median(values)
    mean_val = statistics.mean(values)
    stdev_val = statistics.stdev(values) if len(values) > 1 else 0.0
    coeff_var = stdev_val / mean_val if mean_val != 0 else 0.0

    increasing_trend = sum(1 for i in range(1, len(values)) if values[i] > values[i - 1])
    decreasing_trend = sum(1 for i in range(1, len(values)) if values[i] < values[i - 1])
    stable_trends = sum(1 for i in range(1, len(values)) if values[i] == values[i - 1])

    # Placeholder for 'dominant'; depends on specific business logic
    dominant: Optional[str] = None

    stats = Statistics(
        increasingTrend=increasing_trend,
        decreasingTrend=decreasing_trend,
        stableTrends=stable_trends,
        median=median_val,
        coeffOfVariation=coeff_var,
        standardDeviation=stdev_val,
        dominant=dominant
    )

    return stats
