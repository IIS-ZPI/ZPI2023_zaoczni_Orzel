# tests/test_utils.py

from app.utils.helpers import calculate_statistics, generate_trend_changes_histogram
from app.schemas.response import Statistics, TrendChangesHistogram

def test_calculate_statistics():
    values = [4.5, 4.43, 4.4, 4.5, 4.52]
    stats = calculate_statistics(values)
    assert stats.median == 4.43
    assert round(stats.coeffOfVariation, 3) == 0.031
    assert round(stats.standardDeviation, 4) == 0.0136
    assert stats.increasingTrend == 2
    assert stats.decreasingTrend == 2
    assert stats.stableTrends == 0

def test_generate_trend_changes_histogram():
    values = [4.5, 4.43, 4.4, 4.5, 4.52]
    histogram = generate_trend_changes_histogram(values)
    expected_values = [0, 2, 3, 2, 0]  # Example based on bin logic
    expected_labels = [-1, -0.5, -0.2, 0.2, 0.5, 1]
    assert histogram.values == expected_values
    assert histogram.labels == expected_labels
