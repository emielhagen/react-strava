Activity.delete_all; User.delete_all
puts "========================#{Activity.count} Activities created==============="

User.create(email: 'bert.hagen@gmail.com', password: '123456')
User.create(email: 'tom.sawyer@gmail.com', password: '123456')

Activity.create({
  user_id: User.first.id,
  name: 'Rondje Oosterpark',
  activity_type: 'Run',
  description: 'Lekker rondje in de zon, wat houden we toch van de zomer',
  kudos_count: 5,
  comment_count: 3,
  distance: 8,
  moving_time: 3600,
  start_lat: 52.3698775,
  start_lng: 4.910582,
  end_lat: 52.3585638,
  end_lng: 4.9145737,
  athlete_count: 1,
  average_speed: 10,
  max_speed: 13,
  average_cadence: 174,
  average_temp: 22,
  calories: 539,
  has_heartrate: true,
  average_heart_rate: 143,
  max_heart_rate: 167
})

puts "========================#{Activity.count} Activities created==============="

Activity.create({
  user_id: User.first.id,
  name: 'Groningen',
  activity_type: 'Run',
  description: 'Snel rondje om de Martinitoren, lekker hoor',
  kudos_count: 49,
  comment_count: 13,
  distance: 13,
  moving_time: 9000,
  start_lat: 53.2217873,
  start_lng: 6.4956537,
  end_lat: 52.361389,
  end_lng: 4.880879,
  athlete_count: 3,
  average_speed: 12.9,
  max_speed: 14,
  average_cadence: 176,
  average_temp: 22,
  calories: 539,
  has_heartrate: true,
  average_heart_rate: 156,
  max_heart_rate: 181
})

puts "========================#{Activity.count} Activities created==============="

Activity.create({
  user_id: User.second.id,
  name: 'Volendam',
  activity_type: 'Bike',
  description: 'Snel rondje Volendam en terug, even bij Jan smit op bezoek',
  kudos_count: 49,
  comment_count: 13,
  distance: 13,
  moving_time: 9000,
  start_lat: 52.3698775,
  start_lng: 4.910582,
  end_lat: 52.361389,
  end_lng: 4.880879,
  athlete_count: 3,
  average_speed: 12.9,
  max_speed: 14,
  average_cadence: 176,
  average_temp: 22,
  calories: 539,
  has_heartrate: true,
  average_heart_rate: 156,
  max_heart_rate: 181
})

puts "========================#{Activity.count} Activities created==============="

Activity.create({
  user_id: User.second.id,
  name: 'Flevoparkbad',
  activity_type: 'Swim',
  description: 'Triathlon preparation, hopefully it will not be cancelled',
  kudos_count: 49,
  comment_count: 13,
  distance: 13,
  moving_time: 9000,
  start_lat: 52.3698775,
  start_lng: 4.910582,
  end_lat: 52.361389,
  end_lng: 4.880879,
  athlete_count: 3,
  average_speed: 12.9,
  max_speed: 14,
  average_cadence: 176,
  average_temp: 22,
  calories: 539,
  has_heartrate: true,
  average_heart_rate: 156,
  max_heart_rate: 181
})

puts "========================#{Activity.count} Activities created==============="
