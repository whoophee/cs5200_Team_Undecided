package edu.northeastern.cs5200.model.util;

import com.fasterxml.jackson.annotation.ObjectIdGenerator;

public class EasyToDeserializeObjectIdGenerator extends ObjectIdGenerator<ObjectId> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	protected final Class<?> _scope;
	
	public EasyToDeserializeObjectIdGenerator() {
		this(Object.class);
	}
	
	public EasyToDeserializeObjectIdGenerator(Class<?> scope) {
		this._scope = scope;
	}
	
	private transient long val = 1L;
	@Override
	public Class<?> getScope() {
		return this._scope;
	}

	@Override
	public boolean canUseFor(ObjectIdGenerator<?> gen) {
		return (gen.getClass() == getClass()) && (gen.getScope() == this._scope);
	}

	@Override
	public ObjectIdGenerator<ObjectId> forScope(Class<?> scope) {
		if (_scope == scope) return this;
		return new EasyToDeserializeObjectIdGenerator(scope);
	}

	@Override
	public ObjectIdGenerator<ObjectId> newForSerialization(Object context) {
		return new EasyToDeserializeObjectIdGenerator(_scope);
	}

	@Override
	public IdKey key(Object key) {
		if (key == null) return null;
		return new IdKey(getClass(), _scope, key);
	}

	@Override
	public ObjectId generateId(Object forPojo) {
		return new ObjectId(this.val++, forPojo.getClass().getName());
	}
	
}
class ObjectId {
	public long __id;
	public String __type;
	
	ObjectId(long id, String type) {
		this.__id = id;
		this.__type = type;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (__id ^ (__id >>> 32));
		result = prime * result + ((__type == null) ? 0 : __type.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ObjectId other = (ObjectId) obj;
		if (__id != other.__id)
			return false;
		if (__type == null) {
			if (other.__type != null)
				return false;
		} else if (!__type.equals(other.__type))
			return false;
		return true;
	}
	
	
}
