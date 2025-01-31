# tests/test_utils.py

import numpy as np
from app.utils.helpers import calculate_statistics, generate_trend_changes_histogram
from app.schemas.response import Statistics, TrendChangesHistogram

def test_calculate_statistics():
    values = [4.5, 4.3, 4.5, 4.4, 4.3]
    stats = calculate_statistics(values)
    assert stats.median == 4.4
    assert round(stats.coeffOfVariation, 3) == 0.023
    assert round(stats.standardDeviation, 4) == 0.1
    assert stats.increasingTrend == 1
    assert stats.decreasingTrend == 3
    assert stats.stableTrends == 0

def test_generate_trend_changes_histogram():
    values = [4.5, 4.3, 4.5, 4.4, 4.3]
    histogram = generate_trend_changes_histogram(np.round(np.diff(values), 2))
    expected_values = [1, 2, 0, 1]
    expected_labels = [-0.2, -0.1, 0, 0.1, 0.2]
    assert histogram.values == expected_values
    assert [round(elem, 2) for elem in histogram.labels] == expected_labels
