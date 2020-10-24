import boto3, json, time

def on_event(event, context):
    print(event)
    request_type = event["RequestType"]
    if request_type == "Create":
        return on_create(event)
    if request_type == "Update":
        return on_create(event)
    if request_type == "Delete":
        return on_delete(event)
    raise Exception("Invalid request type: %s" % request_type)


def get_parameter_version_by_name(name):
    client = boto3.client("ssm")
    response = client.describe_parameters(
      ParameterFilters=[
        {
            'Key': 'Name',
            'Values': [ name ]
        },
      ]
    )
    print(response)
    
    return response.get('Parameters')[0].get('Version')

def on_create(event):
    props = event["ResourceProperties"]
    print("create new resource with props %s" % props)
    parameter_name = props["parameterName"]
    version = get_parameter_version_by_name(parameter_name)
    output = {}
    output['Version'] = version
    print(output)

    # random the physical_id
    physical_id = str(time.time())
    return {"PhysicalResourceId": physical_id, "Data": output}

def on_delete(event):
    physical_id = event["PhysicalResourceId"]
    print("delete resource %s" % physical_id)
