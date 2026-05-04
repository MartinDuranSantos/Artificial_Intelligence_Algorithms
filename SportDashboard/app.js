// Mock Running Data
const mockActivities = [
  {
    id: 1,
    route: "Morning Trail Run",
    date: "2025-05-01",
    distance: 8.2,
    duration: 48,
    pace: 5.85,
    heartRate: 152,
    elevation: 120
  },
  {
    id: 2,
    route: "City Park Loop",
    date: "2025-05-02",
    distance: 5.0,
    duration: 28,
    pace: 5.6,
    heartRate: 145,
    elevation: 35
  },
  {
    id: 3,
    route: "Lakeside Trail",
    date: "2025-05-03",
    distance: 12.5,
    duration: 75,
    pace: 6.0,
    heartRate: 158,
    elevation: 210
  },
  {
    id: 4,
    route: "Quick Midday Run",
    date: "2025-05-04",
    distance: 3.2,
    duration: 16,
    pace: 5.0,
    heartRate: 138,
    elevation: 20
  },
  {
    id: 5,
    route: "Hill Training",
    date: "2025-05-05",
    distance: 10.0,
    duration: 62,
    pace: 6.2,
    heartRate: 165,
    elevation: 280
  },
  {
    id: 6,
    route: "Riverside Path",
    date: "2025-05-06",
    distance: 6.8,
    duration: 38,
    pace: 5.59,
    heartRate: 148,
    elevation: 55
  },
  {
    id: 7,
    route: "Sunday Long Run",
    date: "2025-05-07",
    distance: 18.2,
    duration: 115,
    pace: 6.32,
    heartRate: 162,
    elevation: 350
  },
  {
    id: 8,
    route: "Track Intervals",
    date: "2025-04-30",
    distance: 4.5,
    duration: 24,
    pace: 5.33,
    heartRate: 172,
    elevation: 0
  },
  {
    id: 9,
    route: "Mountain Trail",
    date: "2025-04-29",
    distance: 15.0,
    duration: 98,
    pace: 6.53,
    heartRate: 160,
    elevation: 420
  },
  {
    id: 10,
    route: "Recovery Jog",
    date: "2025-04-28",
    distance: 3.0,
    duration: 18,
    pace: 6.0,
    heartRate: 125,
    elevation: 15
  }
];

// Calculate summary statistics
function calculateStats(activities) {
  const totalDistance = activities.reduce((sum, a) => sum + a.distance, 0);
  const totalDuration = activities.reduce((sum, a) => sum + a.duration, 0);
  const totalPace = activities.reduce((sum, a) => sum + a.pace, 0);
  const totalHeartRate = activities.reduce((sum, a) => sum + a.heartRate, 0);
  const avgPace = totalPace / activities.length;
  const avgHeartRate = totalHeartRate / activities.length;

  // Calculate total time in hours
  const totalTimeHours = totalDuration / 60;

  // Weekly progress (this week vs last week)
  const currentWeek = activities.slice(0, 5);
  const previousWeek = activities.slice(5, 10);
  const currentWeekDistance = currentWeek.reduce((sum, a) => sum + a.distance, 0);
  const previousWeekDistance = previousWeek.reduce((sum, a) => sum + a.distance, 0);
  const weeklyProgress = previousWeekDistance > 0
    ? ((currentWeekDistance - previousWeekDistance) / previousWeekDistance * 100).toFixed(0)
    : 0;

  return {
    totalDistance: totalDistance.toFixed(1),
    avgPace: avgPace.toFixed(2),
    totalTime: totalTimeHours.toFixed(1),
    avgHeartRate: Math.round(avgHeartRate),
    weeklyProgress: Math.round(weeklyProgress)
  };
}

// Get weekly distance data
function getWeeklyDistance(activities, period = 'weekly') {
  let labels = [];
  let distances = [];

  if (period === 'weekly') {
    labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    distances = [0, 0, 0, 0, 0, 0, 0];
    activities.slice(0, 7).forEach((activity, i) => {
      distances[i] = activity.distance;
    });
  } else if (period === 'monthly') {
    labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    distances = [25.5, 32.0, 18.5, 28.0];
  } else if (period === 'yearly') {
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    distances = [85, 92, 78, 110, 95, 0, 0, 0, 0, 0, 0, 0];
  }

  return { labels, distances };
}

// Get heart rate zones distribution
function getHeartRateZones(activities) {
  // Calculate time in each zone based on average HR
  const zones = [0, 0, 0, 0, 0];
  const zoneNames = ['Zone 1 (Recovery)', 'Zone 2 (Easy)', 'Zone 3 (Aerobic)', 'Zone 4 (Threshold)', 'Zone 5 (Max)'];

  activities.forEach(activity => {
    const hr = activity.heartRate;
    if (hr < 130) zones[0] += 1;
    else if (hr < 145) zones[1] += 1;
    else if (hr < 160) zones[2] += 1;
    else if (hr < 175) zones[3] += 1;
    else zones[4] += 1;
  });

  const total = zones.reduce((sum, z) => sum + z, 0);
  const percentages = zones.map(z => total > 0 ? (z / total * 100) : 0);

  return { zoneNames, percentages };
}

// Render summary cards
function renderSummaryCards() {
  const stats = calculateStats(mockActivities);

  document.getElementById('total-distance').textContent = stats.totalDistance;
  document.getElementById('avg-pace').textContent = stats.avgPace;
  document.getElementById('total-time').textContent = stats.totalTime;
  document.getElementById('avg-heart-rate').textContent = stats.avgHeartRate;
  document.getElementById('weekly-progress').textContent = stats.weeklyProgress;
}

// Render weekly distance chart
function renderWeeklyChart(period = 'weekly') {
  const container = document.getElementById('weekly-chart');
  const data = getWeeklyDistance(mockActivities, period);

  const maxDistance = Math.max(...data.distances);
  const chartHeight = 180;

  let html = '<div class="weekly-chart">';

  data.labels.forEach((label, i) => {
    const distance = data.distances[i];
    const barHeight = maxDistance > 0 ? (distance / maxDistance * chartHeight) : 0;
    const height = Math.max(barHeight, 4);

    html += `
      <div class="bar-group">
        <div class="bar" style="height: ${height}px" data-value="${distance.toFixed(1)} km">
          <span class="bar-value">${distance.toFixed(1)}</span>
        </div>
        <span class="bar-label">${label}</span>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
}

// Render heart rate zones chart
function renderHRZonesChart() {
  const container = document.getElementById('hr-zones-chart');
  const data = getHeartRateZones(mockActivities);

  let html = '<div class="hr-zones-chart">';

  data.zoneNames.forEach((name, i) => {
    const percent = data.percentages[i];
    const zoneClass = `zone-zone${i + 1}`;

    html += `
      <div class="hr-zone">
        <span class="zone-label">${name}</span>
        <div class="zone-bar-container">
          <div class="zone-bar ${zoneClass}" style="width: ${percent}%"></div>
        </div>
        <span class="zone-percent">${percent.toFixed(0)}%</span>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
}

// Filter activities by distance type
function filterActivities(filter) {
  let filtered = mockActivities;

  if (filter === 'short') {
    filtered = mockActivities.filter(a => a.distance < 5);
  } else if (filter === 'medium') {
    filtered = mockActivities.filter(a => a.distance >= 5 && a.distance <= 10);
  } else if (filter === 'long') {
    filtered = mockActivities.filter(a => a.distance > 10);
  }

  return filtered;
}

// Render activity list
function renderActivityList(filter = 'all') {
  const container = document.getElementById('activities-list');
  const emptyState = document.getElementById('empty-state');
  const activities = filterActivities(filter);

  if (activities.length === 0) {
    container.innerHTML = '';
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  let html = '';

  activities.forEach(activity => {
    const pace = activity.pace.toFixed(2);
    const minutes = Math.floor(activity.duration);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const duration = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

    html += `
      <div class="activity-item">
        <span class="activity-route" data-label="Route">${activity.route}</span>
        <span class="activity-date" data-label="Date">${activity.date}</span>
        <span class="activity-distance" data-label="Distance">${activity.distance.toFixed(1)} km</span>
        <span class="activity-duration" data-label="Duration">${duration}</span>
        <span class="activity-pace" data-label="Pace">${pace} min/km</span>
        <span class="activity-heartrate" data-label="HR">${activity.heartRate} bpm</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Initialize the app
function init() {
  renderSummaryCards();
  renderWeeklyChart();
  renderHRZonesChart();
  renderActivityList();

  // Set up distance filter event listener
  const distanceFilter = document.getElementById('distance-filter');
  distanceFilter.addEventListener('change', (e) => {
    renderActivityList(e.target.value);
  });

  // Set up time filter event listener
  const timeFilter = document.getElementById('time-filter');
  timeFilter.addEventListener('change', (e) => {
    renderWeeklyChart(e.target.value);
  });
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', init);