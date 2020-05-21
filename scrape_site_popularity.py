

import populartimes,sys,json
try:
    pop = populartimes.get_id(sys.argv[1], sys.argv[2]) 
    data = {}
    if 'populartimes' in pop.keys():
        data['popular_times'] = pop['populartimes']


    if 'current_popularity' in pop.keys():
        data['current_popularity'] = pop['current_popularity']



    if 'time_wait' in pop.keys():
        data['time_wait'] = pop['time_wait']

    print(json.dumps(data),)
except:
    print('{}',)
